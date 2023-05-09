// communicate with the oobabooga text-generation-webui api

import request from 'request';
import Discord from 'discord.js';

export const name = 'llm';
export const description = 'talk with a local hosted LLM';

let HOST = '127.0.0.1';

export function execute(message) {
    const body = {
        'prompt': message.content,
        // 'max_new_tokens': 250,
        // 'do_sample': true,
        // 'temperature': 1.3,
        // 'top_p': 0.1,
        // 'typical_p': 1,
        // 'repetition_penalty': 1.18,
        // 'top_k': 40,
        // 'min_length': 0,
        // 'no_repeat_ngram_size': 0,
        // 'num_beams': 1,
        // 'penalty_alpha': 0,
        // 'length_penalty': 1,
        // 'early_stopping': False,
        // 'seed': -1,
        // 'add_bos_token': True,
        // 'truncation_length': 2048,
        // 'ban_eos_token': false,
        // 'skip_special_tokens': true,
        // 'stopping_strings': []
    };

    const options = {
        url: `http://${HOST}:5000/api/v1/generate`,
        method: 'POST',
        json: body,
    }

    request(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(`statusCode: ${res.statusCode}`);
        console.log(body);

        const response = new Discord.MessageEmbed()
            .setAuthor(`LLM for ${message.author.username}`)
            .setDescription(body.results[0].text)
            .setColor('RANDOM');

        message.channel.send(response);
    });
};

export default {
    name,
    description,
    execute,
};