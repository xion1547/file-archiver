package com.filearchiver.file;

import com.filearchiver.s3.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController()
@RequestMapping("/files")
public class FileController {
    private final FileRepository fileRepository;
    private final S3Service s3Service;

    @Autowired
    public FileController(FileRepository fileRepository, S3Service s3Service) {
        this.fileRepository = fileRepository;
        this.s3Service = s3Service;
    }

    @RequestMapping("/findFiles")
    @ResponseBody
    public List<File> findFiles(){
        return (List<File>) fileRepository.findAll();
    }

    @RequestMapping("/findAllByIdContains")
    @ResponseBody
    public List<File> findAllByIdContains(@RequestParam("ids") List<Long> ids){
        return (List<File>) fileRepository.findAllById(ids);
    }

    @RequestMapping("/findAllByFilePath")
    @ResponseBody
    public List<File> findAllByFilePath(@RequestParam("filePath") String filePath){
        return fileRepository.findAllByFilePath(filePath);
    }

    @PostMapping("/addFile")
    @ResponseBody
    public File addFile(@RequestParam("filePath") String filePath){
        File myFile = new File();
        myFile.setFilePath(filePath);
        return fileRepository.save(myFile);
    }

    @DeleteMapping("/deleteFileByIdEquals")
    void deleteFileByIdEquals(@RequestParam("id") Long id){
        fileRepository.deleteById(id);
    }

    @RequestMapping("/generatePresignUrls")
    public Map<Long, String> generatePresignUrls(@RequestParam("PresignUrls") List<Long> ids){
        Map<Long, String> mappedIdsToUrls = new HashMap<>();
        Iterable<File> files = fileRepository.findAllById(ids);
        for(File eachFile : files){
            mappedIdsToUrls.put(eachFile.getId(), s3Service.findByName(eachFile.getFilePath()));
        }
        return mappedIdsToUrls;
    }

    @PostMapping("/savePresignUrls")
    public String savePresignUrls(@RequestParam("PresignUrsl") String url){
        return s3Service.save(url);
    }

}
