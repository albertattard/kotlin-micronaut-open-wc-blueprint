package com.albertattard.blueprint.greeting

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/greet")
class GreetingController internal constructor(
  private var service: GreetingService
) {
  @Get("/{name}", produces = [MediaType.APPLICATION_JSON])
  fun count(name: String): HttpResponse<Greeting> =
    HttpResponse.ok(service.greet(name))
}
