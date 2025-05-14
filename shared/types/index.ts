export interface IUser {
    id: string
    email: string
    created_at: string
    name: string
    avatar_url: string
  }

  export interface IAddAnime {
    animeId: number;
    userId: string;
    current_Time: number;
    duration_Time: number;
    nameAnime: string;
    img: string | null;
    episode: number;
    updated: number;
    code: string
  }

 export interface IRegisterForm {
    name: string
    email: string
    password: string
  }
  export interface ILoginForm {
    email: string
    password: string
  }
  interface ISeason {
    string: string
    code: number
    year: number
    week_day: number
  }
  export interface IAnimeCard{
    id: number
    code: string
    names: {
      en: string
      ru: string
    }
    poster: string
    description: string
    season: ISeason
  }

  export type TUserResponse<T = unknown> = 
  | { data: T; error: null }
  | { data: null; error: { message: string } }

  interface IAnimeBase {
    id: number;
    code: string;
    description: string;
    updated: number;
    announce: string | null;
    franchises: [];
    genres: [];
    in_favorites: number;
    player: IAnimePlayer;
    last_change: number;
    names: {
      en: string;
      ru: string;
      alternative: string | null;
    };
    season: ISeason;
    status: {
      string: string;
      code: number;
    };
    team: {
      voice: string[]
    };
    torrents: object;
    type: {
      code: number;
      string: string;
      episodes: number;
      full_string: string;
      length: number;
    };
  }

  export interface IHls{
    fhd: string;
    hd: string;
    sd: string;
  }

  export interface IEpisode {
    created_timestamp: number;
    episode: number;
    hls: {[key: string]: IHls};
    name: string;
    preview: string;
    skips: {
      ending: [];
      opening: [];
      uuid: string;
    };
  }
  
  export interface IAnimePlayer {
    
      alternative_player: string | null;
      episodes: {
        first: number;
        last: number;
        string: string;
      };
      host: string | null;
      list: {[key: string]: IEpisode};
    
  }
  
  interface IAnimePosters {
    posters: {
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      original: {
        url: string;
      };
    };
  }
  
 export type TAnime = IAnimeBase & IAnimePosters;