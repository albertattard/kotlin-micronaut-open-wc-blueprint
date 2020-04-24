package com.albertattard.blueprint.greeting

import javax.inject.Singleton

@Singleton
class DefaultGreetingService : GreetingService {

  override fun greet(name: String): Greeting =
    Greeting(message = "Welcome $name")
}
