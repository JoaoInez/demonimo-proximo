import { formatDistanceToNowStrict } from "date-fns";
import { pt } from "date-fns/locale";

const howLongSince = (date: string) =>
  formatDistanceToNowStrict(new Date(date), { locale: pt });

export default howLongSince;
