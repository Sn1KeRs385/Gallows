using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Gallows.Models
{
    public class Game
    {
        public int GameID { get; set; }
        public List<string> Word { get; set; }
    }
}
