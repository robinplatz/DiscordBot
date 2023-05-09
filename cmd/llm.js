// communicate with the oobabooga text-generation-webui api

import request from 'request';

export const name = 'llm';
export const description = 'talk with a local hosted LLM';

let HOST = '127.0.0.1';

export function execute(message) {
    // add a preamble or system prompt
    const prompt_preamble = `${message.content}>`;
    const body = {
        'prompt': prompt_preamble,
        'max_new_tokens': 250,
        'do_sample': true,
        'temperature': 0.7,
        'top_p': 0.1,
        'typical_p': 1,
        'repetition_penalty': 1.18,
        'top_k': 40,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': false,
        'seed': -1,
        'add_bos_token': true,
        'truncation_length': 2048,
        'ban_eos_token': false,
        'skip_special_tokens': true,
        'stopping_strings': []
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
        console.log(body.results[0].text);
        message.channel.send(`@${message.author.username} ${body.results[0].text.replace('\n', '')}`);
    });
};

export default {
    name,
    description,
    execute,
};