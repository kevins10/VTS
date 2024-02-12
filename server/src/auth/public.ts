/* 
    Creates a "@Public()" decorator that can be used to make an endpoint publicly accessible (no login required).
*/

import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "./secrets";

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
