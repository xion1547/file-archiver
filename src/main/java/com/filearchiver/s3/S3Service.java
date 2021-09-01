package com.filearchiver.s3;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.regex.Pattern;

@Service
public class S3Service {

    private final AmazonS3 amazonS3;

    @Autowired
    public S3Service(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    @Value("${s3.bucketName}")
    private String s3Bucket;

    private String generateURL(String bucket, String key, HttpMethod httpMethod){
        Calendar myCal = Calendar.getInstance();
        myCal.setTime(new Date());
        myCal.add(Calendar.MINUTE, 5);

        return amazonS3.generatePresignedUrl(bucket, key, myCal.getTime(), httpMethod).toString();
    }

    public String findByName(String filePath){
        Pattern pattern = Pattern.compile("/", Pattern.LITERAL);
        String[] result = pattern.split(filePath);
        StringBuilder filePathResult = new StringBuilder();
        for(int i = 3; i<result.length;i++){
            filePathResult.append(result[i]).append("/");
        }
        filePathResult = new StringBuilder(filePathResult.substring(0, filePathResult.length() - 1));
        String filePathResultString = filePathResult.toString();
        if (!amazonS3.doesObjectExist(s3Bucket, filePathResultString))
            return "File does not exist!";
        return generateURL(result[2], filePathResultString, HttpMethod.GET);
    }

    public String save(String fileName){
        return generateURL(s3Bucket, fileName, HttpMethod.PUT);
    }
}
