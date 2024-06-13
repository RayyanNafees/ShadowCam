import $ from "jquery";

const Q = <T extends HTMLElement>(q: string) => document.querySelector(q) as T;

const mirror = Q("#reverse");
const video = Q<HTMLVideoElement>("video");


const config = {
	video: {
		facingMode: "user",
	},
	audio: false,
};

video.oncanplay = () => {
	$("#loader").fadeOut("slow");
};

navigator.mediaDevices
	.getUserMedia(config)
	.then((stream) => {
		video.srcObject = stream;
	})
	.catch(alert);

mirror.onclick = () => {
	if (config.video.facingMode === "user")
		config.video.facingMode = "environment";
	else config.video.facingMode = "user";
};

