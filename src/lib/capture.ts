import { img2blob } from "@/utils/img";

const Q = <T extends HTMLElement>(q: string) => document.querySelector(q) as T;
const video = Q<HTMLVideoElement>("video");

const canvas = Q<HTMLCanvasElement>("canvas");
const photo = Q<HTMLImageElement>("#photo");
const shoot = Q("#shoot");
let filter: string;
	
shoot.onclick = takepicture;
clearphoto();

function clearphoto() {
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	context.fillStyle = "#AAA";
	context.fillRect(0, 0, canvas.width, canvas.height);

	const data = canvas.toDataURL("image/png");
	photo.setAttribute("src", data);
}

function takepicture() {
	const [height, width] = [innerHeight, innerHeight];
	const context = canvas.getContext("2d") as CanvasRenderingContext2D;
	if (width && height) {
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);
		context.filter = filter;
		const data = canvas.toDataURL("image/png");
		photo.setAttribute("src", data);
	} else clearphoto();
}

const download = Q<HTMLAnchorElement>("a[download]");

download.addEventListener("click", async () => {
	const photoBlob = await img2blob(photo);
	if (!photoBlob) return new Error("Failed to convert photo to blob");

	download.href = URL.createObjectURL(new Blob([photoBlob]));
});

const brightness = Q<HTMLInputElement>("input[type='range']");

brightness.addEventListener("input", function changebright() {
	filter = `brightness(${brightness.value})`;
	canvas.style.filter = filter;
	video.style.filter = filter;
	photo.style.filter = filter;

	Q("#data::before").innerHTML = brightness.value;
});

// Show the image slider
canvas.onclick = () => {
	Object.assign(canvas.style, {
		transition: "0.5s",
		height: `${0.8 * video.height}px`,
		width: `${0.8 * video.width}px`,
		position: "absolute",
		bottom: "10%",
		left: "10%",
	});
};

document.body.onclick = (e) => {
	if (e.target !== canvas)
		Object.assign(canvas.style, {
			position: "absolute",
			bottom: "10px",
			left: "10px",
			border: "2px solid white",
			height: "40px",
			width: "40px",
		});
};
