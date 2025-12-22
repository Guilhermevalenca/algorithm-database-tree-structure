import type react from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export function AppCard(props: react.PropsWithChildren) {
    return <Card {...props}>{props.children}</Card>;
}