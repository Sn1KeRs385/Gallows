using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Gallows.Models
{
    public class CheckLetter
    {
        public int GameID { get; set; }
        public List<string> Word { get; set; }
        public char Letter { get; set; }
        public bool Good { get; set; }
    }
}
