using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Gallows.Data;
using Gallows.Data.Tables;
using Gallows.Models;

namespace Gallows.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {

        private ApplicationDbContext db;

        public GameController(ApplicationDbContext context)
        {
            db = context;
        }

        [HttpGet("start")]
        public Game Start()
        {
            Words[] Words = db.Words.ToArray();
            int WordCount = Words.Count();
            Random rnd = new Random();
            int Select = rnd.Next(1, WordCount);
            Words Word = Words[Select - 1];
            Games Game = new Games() { WordID = Word.Id };
            db.Games.Add(Game);
            db.SaveChanges();
            Game returnModel = new Game() { GameID = Game.Id };
            returnModel.Word = new List<string>();
            for(int i = 0; i < Word.Word.Length; i++)
            {
                returnModel.Word.Add("*");
            }
            return returnModel;
        }

        [HttpPost("checkletter")]
        public CheckLetter CheckLetter([FromBody]CheckLetter model)
        {
            Games Game = db.Games.Find(model.GameID);
            Words Word = db.Words.Find(Game.WordID);
            Word.Word = Word.Word.ToUpper();
            if (Word.Word.IndexOf(model.Letter) == -1)
            {
                model.Good = false;
            }
            else
            {
                model.Good = true;
                for(int i = 0; i < Word.Word.Length; i++)
                {
                    if(Word.Word[i] == model.Letter)
                    {
                        model.Word[i] = model.Letter.ToString();
                    }
                }
            }
            return model;
        }
    }
}
