import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { PostService } from "../../backend";

export const getById: ResolveFn<Object> = (route, state) => {
    const id = route.paramMap.get('id') || '';
    console.log(id);
    return inject(PostService).getById(id)
}