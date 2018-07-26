import { Router, Response, Request } from "express";
import { isURL } from "validator";
import { homeURL } from "./constants";
import * as shortid from "shortid";
import { Model } from "./models/url";
const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.redirect(homeURL);
});

router.get("/:uuid", async (req: Request, res: Response) => {
  const NOT_FOUND = `${homeURL}/not-found`;
  const { uuid } = req.params;

  if (!shortid.isValid(uuid)) {
    return res.redirect(NOT_FOUND); // redirect to 404.
  }

  const URL = await Model.findOne({ uuid });

  if (URL) {
    return res.redirect(
      /^(f|ht)tps?:\/\//i.test(URL.redirectTo)
        ? URL.redirectTo
        : `https://${URL.redirectTo}`
    );
  }

  return res.redirect(NOT_FOUND); // redirect to 404.
});

router.post("/create-url", async (req: Request, res: Response) => {
  if (req.body["url"] && isURL(req.body["url"])) {
    const URL = new Model({
      redirectTo: req.body["url"]
    });

    try {
      await URL.save();
      res.json({ url: `${homeURL}/${URL.uuid}` });
    } catch (e) {
      res.json({
        url: null,
        error: "Cannot Save the URL."
      });
    }
  } else {
    res.json({ url: null, error: "URL was not provided." });
  }
});

export default router;
