declare interface IFlavorList {
    name: string;
    color: string;
    rotation: string;
    image?: string;
}

declare interface INutrientList {
    label: string;
    amount: string;
}

declare interface ICard {
    src: string;
    rotation: string;
    name: string;
    img: string;
    translation?: string;
}
