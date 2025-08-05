<?php

namespace App;

enum UserType: int
{
    case User = 1;
    case Agent = 2;
    case Admin = 3;

    public function label(): string
    {
        return match ($this) {
            self::User => 'User',
            self::Agent => 'Agent',
            self::Admin => 'Admin',
        };
    }
}
