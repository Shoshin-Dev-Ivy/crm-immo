FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpq-dev \
    $PHPIZE_DEPS

RUN docker-php-ext-install pdo pdo_pgsql

# APCu
RUN pecl install apcu \
    && docker-php-ext-enable apcu \
    && php -m | grep apcu \
    && echo "APCU INSTALLED OK"

RUN echo "apc.enabled=1" > /usr/local/etc/php/conf.d/apcu.ini \
    && echo "apc.enable_cli=1" >> /usr/local/etc/php/conf.d/apcu.ini \
    && echo "apc.serializer=php" >> /usr/local/etc/php/conf.d/apcu.ini

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www