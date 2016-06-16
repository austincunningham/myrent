package models;
import javax.persistence.Entity;

import play.db.jpa.Model;

@Entity
public class ContactModel extends Model
{
  public String firstName;
  public String lastName;
  public String email;
  public String msgtxt;

  public ContactModel(String firstName, String lastName, String email, String msgtxt)
  {
    this.firstName = firstName;
    this.lastName  = lastName;
    this.email     = email;
    this.msgtxt  = msgtxt;
  }
}