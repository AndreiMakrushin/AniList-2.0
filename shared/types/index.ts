export interface IUser {
    id: string
    email: string
    created_at: string
    name: string
    avatar_url: string
  }
  export interface IAddAnimeToHistory {
    videoElement: HTMLVideoElement | null;
    animeId: number;
    animeName: string;
    animePoster: string;
    episodeAnime: number;
    code: string
  }
  export interface IAnimeHistoryRecord {
    currentTime: number;
    episode: number;
  }

  export interface IRealTimeUpdate {
    animeId: number;
    episodeAnime: number;
    timer: number;
    realTimeUpdate: string;
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
  export interface IAnimeStatus{
    img: string;
    nameAnime: string;
    animeId: number;
    created_at?: string
    code: string;
    statusId: string;
    statusRu: string;
    statusEn: string
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
    description: string
  }
  export interface IAnimeCard{
    id: number
    code: string
    name: {
      english: string | null
      main: string | null
    } | null
    poster: string
    description: string
    season: ISeason
    year: string
  }

  export type TUserResponse<T = unknown> = 
  | { data: T; error: null }
  | { data: null; error: { message: string } }

  interface IAnimeBase {
    id: number;
    alias: string;
    description: string;
    year: string;
    updated_at: string;
    announce: string | null;
    franchises: [];
    genres: {
      id: number;
      name: string;
    }[];
    in_favorites: number;
    last_change: number;
    name: {
      english: string;
      main: string;
      alternative: string | null;
    };
    season: ISeason;
    status: {
      string: string;
      code: number;
    };
    members:{
      id: string;
      role:{
        value: string;
        description: string;
      }
      nickname: string;
      user: {
        id: string;
        avatar: {
          preview: string;
          thumbnail: string;
        };
      }
      }[]
    torrents: object;
    type: {
      value: string;
      code: number;
      string: string;
      episodes: number;
      full_string: string;
      length: number;
    };
    episodes: IEpisode[]
  }

  export interface IHls{
    fhd: string;
    hd: string;
    sd: string;
  }

  export interface IEpisode {
    id:string;  
    original: number;
    hls: {[key: string]: IHls};
    name: string;
    preview: {
      src: string
    };
    opening: {
      stop: number;
      start: number;
    }
    ending: {
      stop: number;
      start: number;
    }
  }
  
  export interface IAnimePlayer {
      alternative_player: string | null;
      host: string | null;
      episodes: IEpisode[]
    
  }
  
  interface IAnimePosters {
    poster: {
      original: string;
      preview: string;
      src: string;
    }
  }
  
  
 export type TAnime = IAnimeBase & IAnimePosters;