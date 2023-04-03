import { SetMetadata } from "@nestjs/common";
import { ACCES_LEVEL_KEY} from "src/constants/key-decorators";

export const AccessLevel = (level:string) => SetMetadata(ACCES_LEVEL_KEY, level);