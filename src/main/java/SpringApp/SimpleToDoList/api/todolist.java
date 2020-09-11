/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package SpringApp.SimpleToDoList.api;

/**
 *
 * @author Michael
 */
public class todolist {
    private boolean completed;
    private String todo;
    private boolean edit;
    private boolean star;

    public todolist(String todo, boolean completed,boolean edit,boolean star) {
        this.todo = todo;
        this.completed = completed;
        this.edit = edit;
        this.star = star;
        
    }
    
    public String getTodo(){
        return todo;        
    }
    public boolean hasCompleted(){
        return completed;        
    }
       public boolean getedit(){
        return edit;        
    }
        public boolean getstar(){
        return star;        
    }

   

}