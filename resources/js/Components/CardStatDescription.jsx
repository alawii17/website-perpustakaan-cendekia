import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function CardStatDescription({ title, description, children }) {
    return (
        <Card>
            <CardHeader className="p-4 pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-2">{children}</CardContent>
        </Card>
    );
}
