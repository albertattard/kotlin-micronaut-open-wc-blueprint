# Kotlin/Micronaut and Open-WC Blueprint Project

## Pending Issues

1. Not able to mock the `fetch()` calls.

    Tried the following, but failed with both

    1. [fetch-mock](https://www.npmjs.com/package/fetch-mock)
    1. [nock](https://www.npmjs.com/package/nock/)

    Removed `--coverage` for the time being as we are not meeting the recommended coverage levels (file: [frontend-open-wc/package.json](frontend-open-wc/package.json))

    ```json
    {
      "scripts": {
        "test": "npm run format && npm run lint && karma start --coverage"
     }
   }
    ```

1. The latest version of `kotlintest-runner-junit5` fails with an `initializationError`

    ```kotlin
    dependencies {
        testImplementation("io.kotlintest:kotlintest-runner-junit5:3.4.2")
    }
    ```

    Had to revert to a previous version, `3.4.0` until this is sorted.  The issue seems to be related to JUnit 5 and some swallowed exception.  It seems that some types are missing from the classpath.  Further investigation is required.


## Fixed Issues

1. Controller tests are failing in IntelliJ, but work in Gradle

    ```
    io.micronaut.http.client.exceptions.HttpClientResponseException: Page Not Found

    	at io.micronaut.http.client.DefaultHttpClient$10.channelRead0(DefaultHttpClient.java:1791)
    	at io.micronaut.http.client.DefaultHttpClient$10.channelRead0(DefaultHttpClient.java:1709)
    	at io.netty.channel.SimpleChannelInboundHandler.channelRead(SimpleChannelInboundHandler.java:99)
    ```

    **Solution**

    Make sure that IntelliJ is using gradle to build and run as shown next

    ![IntelliJ use gradle to build and run](./docs/images/IntelliJ%20use%20gradle%20to%20build%20and%20run.png "IntelliJ use gradle to build and run")

## Setup

1. Run the tests.

    ```bash
    $ ./gradlew
    ```

1. Package all as one JAR

    ```bash
    $ ./gradlew assembleAll
    ```

1. Run the assembled application

    ```bash
    $ java -jar ./build/application.jar
    ```

    Application will be available at: [http://localhost:8080](http://localhost:8080).

1. Run the journey tests (**coming soon**)

    ```bash
    $ cd journey-tests
    $ npm run test
    ```

    The journey tests need to have the application running and accessible at `http://localhost:8080`.
