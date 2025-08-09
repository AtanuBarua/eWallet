<?php

namespace App;

enum WalletType: int
{
    case Personal = 0;
    case Agent = 1;

    public function label(): string
    {
        return match ($this) {
            self::Personal => 'Personal',
            self::Agent => 'Agent',
        };
    }
}
