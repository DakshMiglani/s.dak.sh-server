import { Router, Response, Request } from 'express';
import { homeURL } from './constants';
import * as shortid from 'shortid';
import { Model } from './models/url';
const router = Router();

router.get('/', (_: Request, res: Response) => {
	res.redirect(homeURL);
});

router.get('/:uuid', async (req: Request, res: Response) => {
	const NOT_FOUND = `${homeURL}/not-found`;
	const { uuid } = req.params;

	if (!shortid.isValid(uuid)) {
		return res.redirect(NOT_FOUND); // redirect to 404.
	}

	const URL = await Model.findOne({ uuid });

	if (URL) {
		return res.redirect(
			/^(f|ht)tps?:\/\//i.test(URL.redirectTo) ? URL.redirectTo : `https://${URL.redirectTo}`
		)
	}

	return res.redirect(NOT_FOUND); // redirect to 404.
});

export default router;
