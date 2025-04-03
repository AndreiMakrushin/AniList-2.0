export interface IUser {
    id: string
    email: string
    created_at: string
    name: string
    avatar_url: string
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

  export type TUserResponse<T = unknown> = 
  | { data: T; error: null }
  | { data: null; error: { message: string } }

  interface IAnimeBase {
    id: number;
    code: string;
    description: string;
    updated: number;
    announce: string | null;
    blocked: {
      copyrights: boolean;
      geoip: boolean;
      geoip_list: [];
    };
    franchises: [];
    genres: [];
    in_favorites: number;
    last_change: number;
    names: {
      en: string;
      ru: string;
      alternative: string | null;
    };
    season: {
      string: string;
      code: number;
      year: number;
      week_day: number;
    };
    status: {
      string: string;
      code: number;
    };
    team: object;
    torrents: object;
    type: {
      code: number;
      string: string;
      episodes: number;
      full_string: string;
      length: number;
    };
  }
  
  interface IAnimePlayer {
    player: {
      alternative_player: string | null;
      episodes: {
        first: number;
        last: number;
        string: string;
      };
      host: string | null;
      is_rutube: boolean;
      list: {
        created_timestamp: number;
        episode: number;
        hls: {
          fhd: string;
          hd: string;
          sd: string;
        };
        name: string;
        preview: string;
        skips: {
          ending: [];
          opening: [];
          uuid: string;
        };
      };
      rutube: object;
    };
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
  
 export type TAnime = IAnimeBase & IAnimePlayer & IAnimePosters;