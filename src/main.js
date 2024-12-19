import fs from 'fs';
import csv from 'csv-parser';
import nodemailer from 'nodemailer';
import { senderEmail, senderPassword } from './config/index.js'

class GiftExchange {
    constructor() {
        this.participants = [];
    }

    async readEmailsFromCSV(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    if (data['Email Address'] && data['Por si tu correo es de rarito pon tu nombre']) {
                        results.push({
                            email: data['Email Address'],
                            name: data['Por si tu correo es de rarito pon tu nombre'],
                            gifts: [
                                data['50 - 100 pesos'],
                                data['100 - 200 pesos'],
                                data['200 - 300 pesos']
                            ]
                        });
                    }
                })
                .on('end', () => {
                    this.participants = results;
                    resolve(results);
                })
                .on('error', (error) => reject(error));
        });
    }

    // Asignación circular: cada persona regala a la siguiente, y el último regala al primero
    assignGiftsCyclically() {
        const shuffled = [...this.participants].sort(() => 0.5 - Math.random()); // Barajar participantes
        const assignments = shuffled.map((person, index) => ({
            giver: person,
            receiver: shuffled[(index + 1) % shuffled.length] // El siguiente en el array, el último regala al primero
        }));
        return assignments;
    }

    // Configurar el transporter de correo
    createTransporter(config) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.senderEmail,
                pass: config.senderPassword
            }
        });
    }

    // Enviar los correos con la asignación de regalo
    async sendEmails(assignments, transporter) {
        const emailPromises = assignments.map(async (assignment) => {
            const mailOptions = {
                from: assignment.giver.email,
                to: assignment.giver.email,
                subject: 'Tu emparejamiento de intercambio de regalos',
                text: `Hola ${assignment.giver.name}, te tocó regalarle a ${assignment.receiver.name}. 

Aquí están las opciones para elegir:

1. ${assignment.receiver.gifts[0]}
2. ${assignment.receiver.gifts[1]}
3. ${assignment.receiver.gifts[2]}

¡Diviértete con el intercambio de regalos!`
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`Correo enviado a ${assignment.giver.email}`);
                return info;
            } catch (error) {
                console.error(`No se pudo enviar correo a ${assignment.giver.email}:`, error);
                throw error;
            }
        });

        await Promise.all(emailPromises);
    }

    // Método principal para ejecutar el intercambio de regalos
    async run(config) {
        try {
            // Leer participantes desde el CSV
            const participants = await this.readEmailsFromCSV(config.csvPath);

            // Asignar regalos de manera circular
            const assignments = this.assignGiftsCyclically();

            // Crear transporter para envío de correos
            const transporter = this.createTransporter(config);

            // Enviar los correos con las asignaciones
            await this.sendEmails(assignments, transporter);

            console.log('Intercambio de regalos completado exitosamente!');
        } catch (error) {
            console.error('Ocurrió un error:', error);
        }
    }
}

const giftExchange = new GiftExchange();

// Configuración de detalles
const config = {
    csvPath: './data.csv',  // Ruta a tu archivo CSV
    senderEmail: senderEmail,  // Email del remitente
    senderPassword: senderPassword  // Contraseña de aplicación
};

// Ejecutar el intercambio de regalos
giftExchange.run(config);
