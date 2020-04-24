package com.albertattard.blueprint.greeting

import io.kotlintest.shouldBe
import io.kotlintest.specs.StringSpec
import io.micronaut.http.HttpRequest
import io.micronaut.http.client.RxHttpClient
import io.micronaut.http.client.annotation.Client
import io.micronaut.test.annotation.MicronautTest
import io.micronaut.test.annotation.MockBean
import io.micronaut.test.extensions.kotlintest.MicronautKotlinTestExtension.getMock
import io.mockk.confirmVerified
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify

@MicronautTest
class GreetingControllerTest(
  private val service: GreetingService,
  @Client("/greet") private val client: RxHttpClient
) : StringSpec({
  "should return the greeting message returned by the service" {
    val mock = getMock(service)

    val name = "Albert"
    val count = Greeting(message = "Hello $name")
    every { mock.greet(name) } returns count

    val response = client.toBlocking().retrieve(HttpRequest.GET<Any>("/$name"), Greeting::class.java)
    response shouldBe count

    verify(exactly = 1) { mock.greet(name) }

    /* The hashCode() invoked by Micronaut and the toString() is invoked by logging */
    verify(exactly = 2) { mock.hashCode() }
    verify(atLeast = 0, atMost = 1) { mock.toString() }
    confirmVerified(mock)
  }
}) {
  @MockBean(GreetingService::class)
  fun pollService(): GreetingService {
    return mockk()
  }
}
