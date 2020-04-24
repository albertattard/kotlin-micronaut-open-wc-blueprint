package com.albertattard.blueprint.greeting

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.micronaut.test.annotation.MicronautTest

@MicronautTest
class DefaultGreetingServiceTest : StringSpec({
  "should return the number of polls" {
    val service = DefaultGreetingService()
    val greeting = service.greet("Albert")
    greeting shouldBe Greeting(message = "Welcome Albert")
  }
})
