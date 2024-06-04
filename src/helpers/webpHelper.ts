import { getImage } from "astro:assets";

export const compressImageToWebp = async (image: ImageMetadata) =>
	await getImage({ src: image, format: "webp", quality: "max" });
