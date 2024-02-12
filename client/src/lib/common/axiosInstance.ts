import axios from "axios";
import { PUBLIC_API_ADDRESS } from '$env/static/public';

export const axiosInstance = axios.create({
	baseURL: `${PUBLIC_API_ADDRESS}/api`,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
