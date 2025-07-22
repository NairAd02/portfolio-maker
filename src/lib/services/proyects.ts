"use server";

import { createClient } from "../supabase/server";

export async function getProyectsList() {
  const supabase = await createClient();
  const { data: proyects, error } = await supabase.from("proyect").select("*");
  console.log(error)
  console.log(proyects);
}

export async function getProyectsList(params: IQueryable) {
    const session = await auth();
  
    const url = new QueryParamsURLFactory(params, apiRoutes.configs.get).build();
  
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
      next: { tags: [tagsCacheByRoutes.configs.multipleTag] },
    });
  
    return await buildApiResponse<PaginationResponse<Config>>(res);
  }