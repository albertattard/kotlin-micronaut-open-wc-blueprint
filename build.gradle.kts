allprojects {
  repositories {
    mavenLocal()
    jcenter()
  }
}

subprojects {
  version = "1.0"
}

task("copyFrontendResources") {
  group = "build"
  description = "Copy frontend resources into backend"
  dependsOn(":frontend-open-wc:build")

  doFirst {
    copy {
      from("./frontend-open-wc/dist")
      into("./backend-micronaut/generated/main/resources/web")
    }
  }
}

task("assembleAll") {
  group = "build"
  description = "Build combined backend & frontend into one JAR"
  dependsOn("copyFrontendResources", ":backend-micronaut:shadowJar")

  doLast {
    copy {
      from("./backend-micronaut/build/libs/backend-micronaut-1.0-all.jar")
      into("./build")
      rename("backend-micronaut-1.0-all.jar", "application.jar")
    }
  }
}

defaultTasks("clean", "ktlintFormat", "dependencyUpdates", "test")
