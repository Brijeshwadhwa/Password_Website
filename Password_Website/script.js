/* ============================================
   Password Strength Checker - JavaScript
   Client-Side Security Analysis
   ============================================ */

// Constants
const GUESSES_PER_SECOND = 10000000000; // 10 billion guesses per second
const STRENGTH_LEVELS = {
    VERY_WEAK: { label: 'Very Weak', emoji: '❌', score: 0 },
    WEAK: { label: 'Weak', emoji: '⚠️', score: 1 },
    MODERATE: { label: 'Moderate', emoji: '✅', score: 2 },
    STRONG: { label: 'Strong', emoji: '🔐', score: 3 },
    VERY_STRONG: { label: 'Very Strong', emoji: '🛡️', score: 4 }
};

// DOM Elements
const passwordInput = document.getElementById('password-input');
const toggleVisibility = document.getElementById('toggle-visibility');
const strengthSection = document.getElementById('strength-section');
const strengthTitle = document.getElementById('strength-title');
const strengthBadge = document.getElementById('strength-badge');
const strengthBar = document.getElementById('strength-bar');
const strengthDetails = document.getElementById('strength-details');
const bruteforceSection = document.getElementById('bruteforce-section');
const bruteforceTime = document.getElementById('bruteforce-time');
const criteriaSection = document.getElementById('criteria-section');
const criteriaList = document.getElementById('criteria-list');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    passwordInput.addEventListener('input', handlePasswordInput);
    toggleVisibility.addEventListener('click', togglePasswordVisibility);
    passwordInput.focus();
});

/**
 * Handle password input changes
 */
function handlePasswordInput() {
    const password = passwordInput.value;
    
    if (password.length === 0) {
        hideAllSections();
        return;
    }

    const analysis = analyzePassword(password);
    displayStrength(analysis);
    displayBruteForceTime(analysis);
    displayCriteria(analysis);
}

/**
 * Analyze password strength
 * @param {string} password - The password to analyze
 * @returns {Object} Analysis results
 */
function analyzePassword(password) {
    const length = password.length;
    
    // Character variety detection
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    
    // Count character types
    const characterTypes = [hasLowercase, hasUppercase, hasNumbers, hasSpecial].filter(Boolean).length;
    
    // Calculate character set size for brute-force estimation
    let characterSetSize = 0;
    if (hasLowercase) characterSetSize += 26;
    if (hasUppercase) characterSetSize += 26;
    if (hasNumbers) characterSetSize += 10;
    if (hasSpecial) characterSetSize += 32; // Common special characters
    
    // Calculate password strength score
    let score = 0;
    
    // Length scoring
    if (length >= 16) score += 3;
    else if (length >= 12) score += 2;
    else if (length >= 8) score += 1;
    else if (length >= 4) score += 0.5;
    
    // Character variety scoring
    if (characterTypes === 4) score += 2;
    else if (characterTypes === 3) score += 1.5;
    else if (characterTypes === 2) score += 1;
    else if (characterTypes === 1) score += 0.5;
    
    // Determine strength level
    let strength;
    if (score >= 4.5) {
        strength = STRENGTH_LEVELS.VERY_STRONG;
    } else if (score >= 3.5) {
        strength = STRENGTH_LEVELS.STRONG;
    } else if (score >= 2) {
        strength = STRENGTH_LEVELS.MODERATE;
    } else if (score >= 1) {
        strength = STRENGTH_LEVELS.WEAK;
    } else {
        strength = STRENGTH_LEVELS.VERY_WEAK;
    }
    
    // Generate explanation
    const explanations = generateExplanations(length, characterTypes, hasLowercase, hasUppercase, hasNumbers, hasSpecial, strength);
    
    return {
        password,
        length,
        hasLowercase,
        hasUppercase,
        hasNumbers,
        hasSpecial,
        characterTypes,
        characterSetSize,
        strength,
        score,
        explanations,
        totalCombinations: characterSetSize > 0 ? Math.pow(characterSetSize, length) : 0
    };
}

/**
 * Generate explanations for password strength
 */
function generateExplanations(length, characterTypes, hasLowercase, hasUppercase, hasNumbers, hasSpecial, strength) {
    const explanations = [];
    
    // Length feedback
    if (length < 8) {
        explanations.push('Password is too short. Use at least 8 characters.');
    } else if (length < 12) {
        explanations.push('Password length is acceptable but could be longer.');
    } else if (length < 16) {
        explanations.push('Good password length.');
    } else {
        explanations.push('Excellent password length.');
    }
    
    // Character variety feedback
    if (characterTypes === 1) {
        explanations.push('Using only one character type makes the password vulnerable.');
    } else if (characterTypes === 2) {
        explanations.push('Using two character types improves security.');
    } else if (characterTypes === 3) {
        explanations.push('Using three character types provides good security.');
    } else {
        explanations.push('Using all four character types maximizes security.');
    }
    
    // Specific feedback
    if (!hasLowercase) {
        explanations.push('Consider adding lowercase letters.');
    }
    if (!hasUppercase) {
        explanations.push('Consider adding uppercase letters.');
    }
    if (!hasNumbers) {
        explanations.push('Consider adding numbers.');
    }
    if (!hasSpecial) {
        explanations.push('Consider adding special characters (!@#$%^&*).');
    }
    
    // Strength-specific feedback
    if (strength === STRENGTH_LEVELS.VERY_WEAK) {
        explanations.push('This password can be cracked almost instantly.');
    } else if (strength === STRENGTH_LEVELS.WEAK) {
        explanations.push('This password can be cracked quickly with modern hardware.');
    } else if (strength === STRENGTH_LEVELS.MODERATE) {
        explanations.push('This password provides basic protection but could be stronger.');
    } else if (strength === STRENGTH_LEVELS.STRONG) {
        explanations.push('This password provides good protection against brute-force attacks.');
    } else {
        explanations.push('This password provides excellent protection against brute-force attacks.');
    }
    
    return explanations;
}

/**
 * Display password strength
 */
function displayStrength(analysis) {
    strengthSection.classList.remove('hidden');
    strengthSection.className = `strength-section strength-${analysis.strength.label.toLowerCase().replace(' ', '-')}`;
    
    strengthTitle.textContent = 'Password Strength';
    strengthBadge.textContent = `${analysis.strength.emoji} ${analysis.strength.label}`;
    
    // Display explanations
    strengthDetails.innerHTML = analysis.explanations
        .map(exp => `<p>• ${exp}</p>`)
        .join('');
}

/**
 * Calculate and display brute-force attack time
 */
function displayBruteForceTime(analysis) {
    if (analysis.characterSetSize === 0 || analysis.length === 0) {
        bruteforceSection.classList.add('hidden');
        return;
    }
    
    bruteforceSection.classList.remove('hidden');
    
    const totalCombinations = analysis.totalCombinations;
    const seconds = totalCombinations / GUESSES_PER_SECOND;
    
    const timeEstimate = formatTime(seconds);
    
    bruteforceTime.innerHTML = `
        <div style="margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);">
            Total Combinations: ${formatNumber(totalCombinations)}
        </div>
        <div>
            Estimated Time: <span style="color: var(--accent-primary);">${timeEstimate}</span>
        </div>
    `;
}

/**
 * Format time in human-readable format
 */
function formatTime(seconds) {
    if (seconds < 1) {
        return 'Less than 1 second';
    }
    
    if (seconds < 60) {
        return `${formatNumber(seconds)} second${seconds !== 1 ? 's' : ''}`;
    }
    
    const minutes = seconds / 60;
    if (minutes < 60) {
        return `${formatNumber(minutes)} minute${minutes !== 1 ? 's' : ''}`;
    }
    
    const hours = minutes / 60;
    if (hours < 24) {
        return `${formatNumber(hours)} hour${hours !== 1 ? 's' : ''}`;
    }
    
    const days = hours / 24;
    if (days < 365) {
        return `${formatNumber(days)} day${days !== 1 ? 's' : ''}`;
    }
    
    const years = days / 365;
    if (years < 1000) {
        return `${formatNumber(years)} year${years !== 1 ? 's' : ''}`;
    }
    
    const millennia = years / 1000;
    return `${formatNumber(millennia)} millennium${millennia !== 1 ? 'a' : ''}`;
}

/**
 * Format large numbers with commas
 */
function formatNumber(num) {
    if (num < 1000) {
        return Math.round(num).toString();
    }
    
    if (num < 1000000) {
        return Math.round(num).toLocaleString();
    }
    
    // For very large numbers, use scientific notation
    if (num >= 1e15) {
        return num.toExponential(2);
    }
    
    return Math.round(num).toLocaleString();
}

/**
 * Display password criteria checklist
 */
function displayCriteria(analysis) {
    criteriaSection.classList.remove('hidden');
    
    const criteria = [
        {
            icon: analysis.length >= 8 ? '✅' : '❌',
            text: `At least 8 characters (current: ${analysis.length})`,
            met: analysis.length >= 8
        },
        {
            icon: analysis.length >= 12 ? '✅' : '❌',
            text: `At least 12 characters (recommended)`,
            met: analysis.length >= 12
        },
        {
            icon: analysis.hasLowercase ? '✅' : '❌',
            text: 'Contains lowercase letters (a-z)',
            met: analysis.hasLowercase
        },
        {
            icon: analysis.hasUppercase ? '✅' : '❌',
            text: 'Contains uppercase letters (A-Z)',
            met: analysis.hasUppercase
        },
        {
            icon: analysis.hasNumbers ? '✅' : '❌',
            text: 'Contains numbers (0-9)',
            met: analysis.hasNumbers
        },
        {
            icon: analysis.hasSpecial ? '✅' : '❌',
            text: 'Contains special characters (!@#$%^&*)',
            met: analysis.hasSpecial
        }
    ];
    
    criteriaList.innerHTML = criteria
        .map(criterion => `
            <li class="criteria-item">
                <span class="criteria-icon">${criterion.icon}</span>
                <span class="criteria-text ${criterion.met ? 'criteria-met' : 'criteria-not-met'}">
                    ${criterion.text}
                </span>
            </li>
        `)
        .join('');
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleVisibility.textContent = type === 'password' ? '👁️' : '🙈';
}

/**
 * Hide all analysis sections
 */
function hideAllSections() {
    strengthSection.classList.add('hidden');
    bruteforceSection.classList.add('hidden');
    criteriaSection.classList.add('hidden');
}

