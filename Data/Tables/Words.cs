using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gallows.Data.Tables
{
    [Table("Words")]
    public class Words
    {
        public int Id { get; set; }

        public string Word { get; set; }
    }
}
