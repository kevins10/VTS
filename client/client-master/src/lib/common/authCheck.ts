import { goto } from "$app/navigation";

export const authCheck = () => {
	if (localStorage.getItem("access_token") === "") {
		goto("/login");
	}
};
