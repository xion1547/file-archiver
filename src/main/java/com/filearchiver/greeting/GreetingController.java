package com.filearchiver.greeting;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {

    public static final String template = "Hello, %s!";
    public final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    @ResponseBody
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name){
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

}
