using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gallows.Data.Tables
{
    [Table("Games")]
    public class Games
    {
        public int Id { get; set; }

        public int WordID { get; set; }
    }
}
