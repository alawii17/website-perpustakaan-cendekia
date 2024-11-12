import { FINEPAYMENTSTATUS } from '@/lib/utils';
import { Badge } from './Components/ui/badge';

export default function GetFineStatusBadge({ status }) {
    const { PENDING, SUCCESS, FAILED } = FINEPAYMENTSTATUS;
    let badge, text;

    switch (status) {
        case PENDING:
            badge = 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 bg-yellow-500';
            text = PENDING;
            break;
        case SUCCESS:
            badge = 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 bg-green-500';
            text = PENDING;
            break;
        case FAILED:
            badge = 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500 bg-red-500';
            text = PENDING;
            break;
        default:
            badge = '';
            text = '-';
    }
    return <Badge className={badge}>{text}</Badge>;
}
