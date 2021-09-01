package com.filearchiver.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

//@RestController
//@RequestMapping("/files/storage")
//@CrossOrigin(origins="*", maxAge=3600)
public class S3Controller {

    private static final String FILE_NAME = "fileName";

//    @Autowired
//    S3Service s3Service;
//
//    @GetMapping
//    public ResponseEntity<Object> findByName(HttpServletRequest request,
//                                             @RequestBody(required = false) Map<String, String> params){
//        //final String path = request.getServletPath();
//        if (params.containsKey(FILE_NAME))
//            return new ResponseEntity<>(s3Service.findByName(params.get(FILE_NAME)), HttpStatus.OK);
//        else return null;
//    }
//
//    @PostMapping
//    public ResponseEntity<Object> saveFile(@RequestParam("extension") String extension) {
//        return new ResponseEntity<>(s3Service.save(extension), HttpStatus.OK);
//    }
}
