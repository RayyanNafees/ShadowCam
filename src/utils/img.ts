export const 
 img2blob = (photo: HTMLImageElement) => {
	// Assuming photo is an HTMLImageElement
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	canvas.width = photo.width;
	canvas.height = photo.height;

	ctx.drawImage(photo, 0, 0);
	return new Promise<Blob|null>((resolve, reject) => {
		canvas.toBlob((blob: Blob | null) => {
			if (!blob) reject();

			resolve(blob);
		}, "image/png");
	});
}