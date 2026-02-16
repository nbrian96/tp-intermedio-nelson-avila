export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: IPokemon[];
}

export interface IPokemonDetails {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        other?: {
            home?: {
                front_default?: string;
            };
            official_artwork?: {
                front_default?: string;
            };
        };
    };
    abilities: {
        ability: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    height: number;
    weight: number;
    flavor_text_entries: {
        language: {
            name: string;
        };
        flavor_text: string;
    }[];
}

export interface IFavoritesState {
    favorites: IPokemonDetails[];
}
