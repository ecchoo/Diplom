import { CardPartition } from "../CardPartition"
import { Card, CardTitle, CardBody } from "./styled"

export const CardModule = ({ name, partitions }) => {
    return (
        <Card>
            <CardTitle>{name}</CardTitle>
            <CardBody>
                {partitions.map(({id, name, leassons}) =>
                    <CardPartition
                        key={id}
                        name={name}
                        leassons={leassons}
                    />
                )}
            </CardBody>
        </Card>
    )
}