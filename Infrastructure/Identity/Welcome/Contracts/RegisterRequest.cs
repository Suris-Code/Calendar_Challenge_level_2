﻿using Domain.Enums;

namespace Infrastructure.Identity.Welcome.Contracts
{
    public class RegisterRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
    }
}
