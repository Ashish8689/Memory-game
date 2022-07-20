export interface CardDetails {
    id: number
    image: string
    active: boolean
    matched: boolean
}

export interface CardComponent {
    data: CardDetails
    changeCardVisibility: (id: number, image: string) => void
}
