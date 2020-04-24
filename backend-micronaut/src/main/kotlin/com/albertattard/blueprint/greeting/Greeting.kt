package com.albertattard.blueprint.greeting

import io.micronaut.core.annotation.Introspected

@Introspected
data class Greeting(val message: String)
