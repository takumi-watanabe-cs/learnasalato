import Vue from "vue";

// ComponentOptions is declared in types/options.d.ts
declare module "vue/types/options" {
  interface VueContext<V extends Vue> {
    app: V;
    isClient: boolean;
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    env: object;
    params: object;
    query: object;
    // err: any;
    payload: any;
  }

  interface ComponentOptions<V extends Vue> {
    metaInfo?: any;
  }
}
