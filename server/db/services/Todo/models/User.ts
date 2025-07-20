import { Entity, type EntityItem } from "electrodb";
import { TABLE_NAME } from "../config";
import { client } from "@db/config";

export const User = new Entity(
    {
        model: {
            service: TABLE_NAME,
            entity: "User",
            version: "1",
        },
        attributes: {
            userId: {
                type: "string",
                required: true,
            },
            name: {
                type: "string",
                required: true,
            },
        },
        indexes: {
            users: {
                pk: {
                    field: "pk",
                    composite: ["userId"],
                },
            },
        },
    },
    { table: TABLE_NAME, client },
);
