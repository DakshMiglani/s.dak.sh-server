import { Router, Response, Request } from "express";
import { isURL } from "validator";
import { homeURL, shortURL } from "./constants";
import * as shortid from "shortid";
import { Model } from "./models/url";
const router = Router();
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-');

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

router.post("/info/:uuid", async (req: Request, res: Response) => {
   const { uuid } = req.params;

   try {
     const URL = await Model.findOne({ uuid });
     if (URL) {
       res.json({ data: URL.toJSON(), error: null })
     } else {
       res.json({ data: null, error: "URL was not found." })
     }
   } catch (e) {
      res.json({ data: null, error: "URL was not found." })
   }
});

router.post("/createdBy/:fingerprint", async (req: Request, res: Response) => {
  const { fingerprint } = req.params;

  try {
    const URL = await Model.find({ createdBy: fingerprint });
    res.json({ data: URL, error: null })
  } catch (e) {
    res.json({ data: null, error: "URL was not found." })
  }
})

router.post("/create-url", async (req: Request, res: Response) => {
  if (req.body["url"] && isURL(req.body["url"])) {
    const URL = new Model({
      redirectTo: req.body["url"],
      createdBy: req.body["createdBy"] || null,
    });

    try {
      await URL.save();
      res.json({ url: `${shortURL}/${URL.uuid}` });
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
