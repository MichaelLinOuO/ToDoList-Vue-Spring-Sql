/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SpringApp.SimpleToDoList.api;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Michael Lin
 */
@RestController
@RequestMapping(path="/api")                // base URL for all handlers
public class RestfulController {


    @Autowired
    JdbcTemplate jdbcTemplate;



   

    @GetMapping("/info*")                  // wildcard
    public String getOtherInfo() {
        return "the other info";
    }
    
    @PostMapping(path="/retrieve/{id}")
    public List<todolist> pwd(@RequestBody(required=false) String requestUserDetails) {
        System.out.println(requestUserDetails.toString());
        if(requestUserDetails.equals("1234")){            
             System.out.println("ok");
        String r = "SELECT * FROM ASS2"; 
          List resultList = jdbcTemplate.queryForList(r);
   
        return resultList;   
        }else
            return null;
    }



 
 
    // must provide RequestBody, default (required=true)
    @PutMapping("/save/{id}")
    public String save(@PathVariable String id, @RequestBody List<todolist> requestUserDetails) {
        try{
        String del = "DELETE FROM ASS2";
        jdbcTemplate.update(del);
          String sql = "INSERT INTO ASS2 VALUES (?,?,?,?)";

        for(todolist e : requestUserDetails){
             System.out.println(e.getTodo());

            int rows = jdbcTemplate.update(sql, e.getTodo(),e.hasCompleted(), e.getedit(),e.getstar());
               
        }
        }catch(Exception e){
            System.out.println(e);
        }
        return "save";
    }

}
