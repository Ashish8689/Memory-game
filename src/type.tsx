export interface CardDetails {
    image: string
    active: boolean
    matched: boolean
}

export interface CardComponent {
    index: number
    data: CardDetails
    changeCardVisibility: (id: number, image: string) => void
}
